(function() {
    const DATA_URL = 'static/data/ci_mse_simulation.json';
    const COLORS = {
        'CI-MSE': '#2468ac',
        'Raw MSE': '#bf3f3f'
    };
    const METRICS = ['CI-MSE', 'Raw MSE'];
    const BASE_MARKER_OPACITY = 0.78;
    const FADED_MARKER_OPACITY = 0.14;
    const BASE_FIT_OPACITY = 0.85;
    const FADED_LINE_OPACITY = 0.18;
    const SUCCESS_BREAK_LOW = 0.30;
    const SUCCESS_BREAK_HIGH = 0.50;
    const SUCCESS_BREAK_GAP = 0.035;
    const SUCCESS_BREAK_SHIFT = (SUCCESS_BREAK_HIGH - SUCCESS_BREAK_LOW) - SUCCESS_BREAK_GAP;
    const SYMBOLS = {
        architecture: 'x',
        x_vla_relative_pct: 'circle',
        x_vla_default_ckpt: 'square',
        peft: 'triangle-up',
        action_head: 'diamond',
        vlm: 'cross'
    };

    function byId(id) {
        return document.getElementById(id);
    }

    function showFallback(message) {
        const fallback = byId('ci-mse-chart-fallback');
        const chart = byId('ci-mse-chart');
        if (fallback) {
            if (message) fallback.textContent = message;
            fallback.hidden = false;
        }
        if (chart) chart.hidden = true;
    }

    function pointsForMetric(data, metric) {
        return data.points.filter(point => point.metric === metric);
    }

    function mean(values) {
        return values.reduce((sum, value) => sum + value, 0) / values.length;
    }

    function std(values) {
        const avg = mean(values);
        return Math.sqrt(values.reduce((sum, value) => sum + Math.pow(value - avg, 2), 0) / values.length);
    }

    function metricAxisStats(data) {
        const ciValues = pointsForMetric(data, 'CI-MSE').map(point => Number(point.validation_error));
        const rawValues = pointsForMetric(data, 'Raw MSE').map(point => Number(point.validation_error));
        return {
            ciMean: mean(ciValues),
            ciStd: std(ciValues),
            rawMean: mean(rawValues),
            rawStd: std(rawValues),
            ciMin: Math.min(...ciValues),
            ciMax: Math.max(...ciValues)
        };
    }

    function rawToCi(rawValue, stats) {
        return stats.ciMean + ((Number(rawValue) - stats.rawMean) / stats.rawStd) * stats.ciStd;
    }

    function ciToRaw(ciValue, stats) {
        return stats.rawMean + ((Number(ciValue) - stats.ciMean) / stats.ciStd) * stats.rawStd;
    }

    function displaySuccessRate(value) {
        const numeric = Number(value);
        if (!Number.isFinite(numeric)) return numeric;
        if (numeric > SUCCESS_BREAK_HIGH) return numeric - SUCCESS_BREAK_SHIFT;
        if (numeric >= SUCCESS_BREAK_LOW) return null;
        return numeric;
    }

    function powerLawCurve(points) {
        const valid = points
            .map(point => ({ x: Number(point.validation_error), y: Number(point.success_rate) }))
            .filter(point => Number.isFinite(point.x) && Number.isFinite(point.y) && point.x > 0 && point.y > 0);
        if (valid.length < 2) return null;

        const logX = valid.map(point => Math.log(point.x));
        const logY = valid.map(point => Math.log(point.y));
        const xAvg = mean(logX);
        const yAvg = mean(logY);
        const numerator = logX.reduce((sum, x, index) => sum + (x - xAvg) * (logY[index] - yAvg), 0);
        const denominator = logX.reduce((sum, x) => sum + Math.pow(x - xAvg, 2), 0);
        if (denominator === 0) return null;

        const exponent = numerator / denominator;
        const logScale = yAvg - exponent * xAvg;
        const minX = Math.min(...valid.map(point => point.x));
        const maxX = Math.max(...valid.map(point => point.x));
        const steps = 120;
        const xs = Array.from({ length: steps }, (_, index) => minX + (index / (steps - 1)) * (maxX - minX));
        return {
            x: xs,
            y: xs.map(x => Math.exp(logScale) * Math.pow(x, exponent))
        };
    }

    function hoverText(point, xLabel) {
        return [
            `<b>${point.model}</b>`,
            `Variant family: ${point.group_label}`,
            `Metric: ${point.metric}`,
            `${xLabel}: ${Number(point.validation_error).toPrecision(4)}`,
            `Success rate: ${(Number(point.success_rate) * 100).toFixed(1)}%`
        ].join('<br>');
    }

    function scatterTraces(data, metrics) {
        const traces = metrics.map(metric => {
            const points = pointsForMetric(data, metric);
            const trace = {
                type: 'scatter',
                mode: 'markers',
                name: metric,
                x: points.map(point => Number(point.validation_error)),
                y: points.map(point => displaySuccessRate(point.success_rate)),
                text: points.map(point => hoverText(point, `${metric} validation error`)),
                customdata: points.map(point => point.group),
                hovertemplate: '%{text}<extra></extra>',
                cliponaxis: false,
                meta: { kind: 'points' },
                marker: {
                    color: COLORS[metric],
                    size: 12,
                    opacity: BASE_MARKER_OPACITY,
                    symbol: points.map(point => SYMBOLS[point.group] || 'circle'),
                    line: { color: '#ffffff', width: 1 }
                }
            };
            if (metric === 'Raw MSE' && metrics.length > 1) trace.xaxis = 'x2';
            return trace;
        });

        metrics.forEach(metric => {
            const curve = powerLawCurve(pointsForMetric(data, metric));
            if (!curve) return;
            const trace = {
                type: 'scatter',
                mode: 'lines',
                name: `${metric} fit`,
                x: curve.x,
                y: curve.y.map(displaySuccessRate),
                line: { color: COLORS[metric], width: 2 },
                opacity: BASE_FIT_OPACITY,
                hoverinfo: 'skip',
                meta: { kind: 'fit' },
                showlegend: false
            };
            if (metric === 'Raw MSE' && metrics.length > 1) trace.xaxis = 'x2';
            traces.push(trace);
        });

        return traces;
    }

    function rankTraces(data, metrics) {
        const traces = metrics.map(metric => {
            const points = pointsForMetric(data, metric);
            return {
                type: 'scatter',
                mode: 'markers',
                name: metric,
                x: points.map(point => point.validation_rank),
                y: points.map(point => point.success_rank),
                text: points.map(point => [
                    `<b>${point.model}</b>`,
                    `Variant family: ${point.group_label}`,
                    `Metric: ${point.metric}`,
                    `Validation-error rank: ${Number(point.validation_rank).toFixed(1)}`,
                    `Success-rate rank: ${Number(point.success_rank).toFixed(1)}`
                ].join('<br>')),
                customdata: points.map(point => point.group),
                hovertemplate: '%{text}<extra></extra>',
                cliponaxis: false,
                meta: { kind: 'points' },
                marker: {
                    color: COLORS[metric],
                    size: 12,
                    opacity: BASE_MARKER_OPACITY,
                    symbol: points.map(point => SYMBOLS[point.group] || 'circle'),
                    line: { color: '#ffffff', width: 1 }
                }
            };
        });

        const rankMax = Math.max(
            ...data.points.map(point => point.validation_rank),
            ...data.points.map(point => point.success_rank)
        );
        traces.push({
            type: 'scatter',
            mode: 'lines',
            name: 'Ideal inverse ordering',
            x: [1, rankMax],
            y: [rankMax, 1],
            line: { color: '#64748b', width: 2, dash: 'dash' },
            meta: { kind: 'reference' },
            hoverinfo: 'skip'
        });
        return traces;
    }

    function sensitivityTraces(data) {
        const sweeps = data.sensitivity || [];
        const grouped = {};
        sweeps.forEach(point => {
            const key = point.parameter || 'Sensitivity';
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(point);
        });
        return Object.keys(grouped).map(key => {
            const points = grouped[key];
            return {
                type: 'scatter',
                mode: 'lines+markers',
                name: key,
                x: points.map(point => point.value),
                y: points.map(point => point.spearman_rho),
                hovertemplate: `${key}<br>Value: %{x}<br>Spearman rho: %{y:.3f}<extra></extra>`
            };
        });
    }

    function traceKind(trace) {
        return trace && trace.meta && trace.meta.kind;
    }

    function baseTraceOpacity(trace) {
        return traceKind(trace) === 'fit' ? BASE_FIT_OPACITY : 1;
    }

    function groupedTraceIndexes(chart) {
        const indexes = [];
        if (!chart || !chart.data) return indexes;
        chart.data.forEach((trace, index) => {
            if (traceKind(trace) === 'points' && Array.isArray(trace.customdata)) {
                indexes.push(index);
            }
        });
        return indexes;
    }

    function applyVariantFocus(chart, activeGroup) {
        if (!activeGroup || !chart || !chart.data) return;

        const pointTraceIndexes = groupedTraceIndexes(chart);
        const markerOpacity = pointTraceIndexes.map(index => {
            const trace = chart.data[index];
            return trace.customdata.map(group => group === activeGroup ? BASE_MARKER_OPACITY : FADED_MARKER_OPACITY);
        });
        const traceOpacity = chart.data.map(trace => traceKind(trace) === 'points' ? 1 : FADED_LINE_OPACITY);

        if (pointTraceIndexes.length > 0) {
            Plotly.restyle(chart, { 'marker.opacity': markerOpacity }, pointTraceIndexes);
        }
        Plotly.restyle(chart, { opacity: traceOpacity });
    }

    function clearVariantFocus(chart) {
        if (!chart || !chart.data) return;

        const pointTraceIndexes = groupedTraceIndexes(chart);
        const markerOpacity = pointTraceIndexes.map(() => BASE_MARKER_OPACITY);
        const traceOpacity = chart.data.map(baseTraceOpacity);

        if (pointTraceIndexes.length > 0) {
            Plotly.restyle(chart, { 'marker.opacity': markerOpacity }, pointTraceIndexes);
        }
        Plotly.restyle(chart, { opacity: traceOpacity });
    }

    function attachVariantHover(chart) {
        if (!chart || !chart.on) return;

        if (chart.__ciMseHoverHandlers && chart.removeListener) {
            chart.removeListener('plotly_hover', chart.__ciMseHoverHandlers.hover);
            chart.removeListener('plotly_unhover', chart.__ciMseHoverHandlers.unhover);
        }

        const handlers = {
            hover: function(event) {
                const activeGroup = event && event.points && event.points[0] && event.points[0].customdata;
                applyVariantFocus(chart, activeGroup);
            },
            unhover: function() {
                clearVariantFocus(chart);
            }
        };

        chart.on('plotly_hover', handlers.hover);
        chart.on('plotly_unhover', handlers.unhover);
        chart.__ciMseHoverHandlers = handlers;

        if (!chart.__ciMseMouseLeaveBound) {
            chart.addEventListener('mouseleave', function() {
                clearVariantFocus(chart);
            });
            chart.__ciMseMouseLeaveBound = true;
        }
    }

    function successBreakShapes() {
        const halfLength = 0.006;
        const ySlant = 0.0035;
        const yLower = SUCCESS_BREAK_LOW + 0.005;
        const yUpper = SUCCESS_BREAK_LOW + SUCCESS_BREAK_GAP - 0.005;
        return [0, 1].flatMap(xCenter => [
            {
                type: 'line',
                xref: 'paper',
                yref: 'y',
                x0: xCenter,
                x1: xCenter,
                y0: yLower,
                y1: yUpper,
                line: { color: '#ffffff', width: 4 },
                layer: 'above'
            },
            {
                type: 'line',
                xref: 'paper',
                yref: 'y',
                x0: xCenter - halfLength,
                x1: xCenter + halfLength,
                y0: yLower - ySlant,
                y1: yLower + ySlant,
                line: { color: '#111111', width: 1 },
                layer: 'above'
            },
            {
                type: 'line',
                xref: 'paper',
                yref: 'y',
                x0: xCenter - halfLength,
                x1: xCenter + halfLength,
                y0: yUpper - ySlant,
                y1: yUpper + ySlant,
                line: { color: '#111111', width: 1 },
                layer: 'above'
            }
        ]);
    }

    function layoutFor(view) {
        const base = {
            autosize: true,
            margin: { l: 64, r: 36, t: 68, b: 100 },
            paper_bgcolor: '#ffffff',
            plot_bgcolor: '#ffffff',
            font: { family: 'Inter, sans-serif', color: '#1e293b' },
            title: { text: '' },
            legend: { orientation: 'h', y: -0.26 },
            shapes: [],
            hoverlabel: { bgcolor: '#ffffff', bordercolor: '#e2e8f0', font: { color: '#1e293b' } },
            xaxis: {
                automargin: true,
                gridcolor: '#e2e8f0',
                layer: 'below traces',
                linecolor: '#111111',
                linewidth: 1.2,
                mirror: true,
                showline: true,
                zeroline: false
            },
            yaxis: {
                automargin: true,
                gridcolor: '#e2e8f0',
                layer: 'below traces',
                linecolor: '#111111',
                linewidth: 1.2,
                mirror: true,
                showline: true,
                zeroline: false
            }
        };

        if (view === 'rank') {
            base.xaxis.title = 'Validation error rank';
            base.yaxis.title = 'Rollout success rate rank';
            base.xaxis2 = { visible: false };
            return base;
        }

        if (view === 'sensitivity') {
            base.xaxis.title = 'Hyperparameter value';
            base.yaxis.title = 'Spearman rho';
            return base;
        }

        base.xaxis.title = 'CI-MSE validation error';
        base.xaxis.color = COLORS['CI-MSE'];
        base.yaxis.title = 'Rollout success rate';
        base.yaxis.range = [-0.035, 0.415];
        base.yaxis.tickmode = 'array';
        base.yaxis.tickvals = [
            0,
            0.1,
            0.2,
            SUCCESS_BREAK_LOW,
            SUCCESS_BREAK_LOW + SUCCESS_BREAK_GAP,
            displaySuccessRate(0.55)
        ];
        base.yaxis.ticktext = ['0%', '10%', '20%', '30%', '50%', '55%'];
        base.shapes = successBreakShapes();
        return base;
    }

    function render(data) {
        const chart = byId('ci-mse-chart');
        const chartTitle = byId('ci-mse-chart-title');
        const viewButtons = Array.from(document.querySelectorAll('#ci-mse-chart-panel .chart-view-btn'));
        if (!chart || viewButtons.length === 0 || !window.Plotly) {
            showFallback('Plotly.js did not load. Please check your network connection or serve the page with internet access.');
            return;
        }

        let currentView = viewButtons.find(button => button.classList.contains('is-active'))?.dataset.view || 'scatter';

        function updateViewButtons() {
            viewButtons.forEach(button => {
                const isActive = button.dataset.view === currentView;
                button.classList.toggle('is-active', isActive);
                button.setAttribute('aria-pressed', String(isActive));
            });
            if (chartTitle) {
                chartTitle.textContent = currentView === 'rank'
                    ? 'Validation Rank vs Success Rank'
                    : 'Success Rate vs Validation Error';
            }
        }

        function draw() {
            const view = currentView;
            const metrics = METRICS;
            let traces;
            updateViewButtons();

            if (view === 'rank') {
                traces = rankTraces(data, metrics);
            } else if (view === 'sensitivity') {
                traces = sensitivityTraces(data);
            } else {
                traces = scatterTraces(data, metrics);
            }

            const layout = layoutFor(view);
            if (view === 'rank') {
                const rankMax = Math.max(
                    ...data.points.map(point => point.validation_rank),
                    ...data.points.map(point => point.success_rank)
                );
                layout.xaxis.range = [0.5, rankMax + 0.5];
                layout.yaxis.range = [0.5, rankMax + 0.5];
            } else if (view === 'scatter') {
                const stats = metricAxisStats(data);
                const ciPadding = (stats.ciMax - stats.ciMin) * 0.08;
                const ciRange = [stats.ciMin - ciPadding, stats.ciMax + ciPadding];
                layout.xaxis.range = ciRange;
                layout.xaxis2 = {
                    automargin: true,
                    color: COLORS['Raw MSE'],
                    gridcolor: '#e2e8f0',
                    layer: 'below traces',
                    overlaying: 'x',
                    range: ciRange.map(value => ciToRaw(value, stats)),
                    side: 'top',
                    showline: false,
                    ticks: '',
                    tickfont: { color: COLORS['Raw MSE'] },
                    title: 'Raw MSE validation error',
                    titlefont: { color: COLORS['Raw MSE'] },
                    zeroline: false
                };
            }

            Plotly.react(chart, traces, layout, {
                responsive: true,
                displayModeBar: false
            }).then(function() {
                attachVariantHover(chart);
            });
        }

        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                currentView = button.dataset.view || 'scatter';
                draw();
            });
        });
        updateViewButtons();
        draw();
    }

    document.addEventListener('DOMContentLoaded', function() {
        const chart = byId('ci-mse-chart');
        if (!chart) return;

        if (window.CI_MSE_SIMULATION_DATA) {
            render(window.CI_MSE_SIMULATION_DATA);
            return;
        }

        fetch(DATA_URL)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then(render)
            .catch(function() {
                showFallback('Interactive chart data is unavailable. Please regenerate static/data/ci_mse_simulation.json or serve the page through a local HTTP server.');
            });
    });
})();
