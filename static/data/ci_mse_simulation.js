window.CI_MSE_SIMULATION_DATA = {
  "source": {
    "xlsx": "temp/iid_correlation_v4.xlsx",
    "python_script": "temp/plot_iid_eval_validation_corr.py",
    "note": "Exported from the workbook consumed by the local plotting script."
  },
  "groups": [
    {
      "id": "architecture",
      "label": "Architecture"
    },
    {
      "id": "x_vla_relative_pct",
      "label": "Data scale"
    },
    {
      "id": "x_vla_default_ckpt",
      "label": "Training steps"
    },
    {
      "id": "peft",
      "label": "PEFT"
    },
    {
      "id": "action_head",
      "label": "Action head"
    },
    {
      "id": "vlm",
      "label": "VLM backbone"
    }
  ],
  "metrics": [
    {
      "id": "CI-MSE",
      "label": "CI-MSE",
      "color": "#2468ac"
    },
    {
      "id": "Raw MSE",
      "label": "Raw MSE",
      "color": "#bf3f3f"
    }
  ],
  "points": [
    {
      "model": "action-head-0.5x 60k",
      "model_dir": "action-head-0.5x-60000-12-iid-merged-results",
      "group": "action_head",
      "group_label": "Action head",
      "metric": "CI-MSE",
      "validation_error": 0.003232,
      "success_rate": 0.175,
      "validation_rank": 19.0,
      "success_rank": 14.5
    },
    {
      "model": "action-head-1.0x 60k",
      "model_dir": "action-head-1.0x-60000-12-iid-merged-results",
      "group": "action_head",
      "group_label": "Action head",
      "metric": "CI-MSE",
      "validation_error": 0.002943,
      "success_rate": 0.2583333333333334,
      "validation_rank": 13.0,
      "success_rank": 23.5
    },
    {
      "model": "action-head-2.0x 60k",
      "model_dir": "action-head-2.0x-60000-12-iid-merged-results",
      "group": "action_head",
      "group_label": "Action head",
      "metric": "CI-MSE",
      "validation_error": 0.002905,
      "success_rate": 0.1875,
      "validation_rank": 9.0,
      "success_rank": 17.5
    },
    {
      "model": "action-head-3.0x 80k",
      "model_dir": "action-head-3.0x-80000-12-iid-merged-results",
      "group": "action_head",
      "group_label": "Action head",
      "metric": "CI-MSE",
      "validation_error": 0.002891,
      "success_rate": 0.2875,
      "validation_rank": 5.0,
      "success_rank": 27.0
    },
    {
      "model": "action-head-4.0x 70k",
      "model_dir": "action-head-4.0x-70000-12-iid-merged-results",
      "group": "action_head",
      "group_label": "Action head",
      "metric": "CI-MSE",
      "validation_error": 0.002893,
      "success_rate": 0.225,
      "validation_rank": 6.0,
      "success_rank": 20.5
    },
    {
      "model": "x-vla-lbm-default 100k",
      "model_dir": "x-vla-lbm-default-100000-12-iid-merged-results",
      "group": "architecture",
      "group_label": "Architecture",
      "metric": "CI-MSE",
      "validation_error": 0.00277,
      "success_rate": 0.275,
      "validation_rank": 2.5,
      "success_rank": 25.5
    },
    {
      "model": "gr00t-n1.7-lbm-eval-39-train 60k",
      "model_dir": "gr00t-n1.7-lbm-eval-39-train-60000-12-iid-merged-results",
      "group": "architecture",
      "group_label": "Architecture",
      "metric": "CI-MSE",
      "validation_error": 0.003312,
      "success_rate": 0.2458333333333333,
      "validation_rank": 21.0,
      "success_rank": 22.0
    },
    {
      "model": "openpi-pi05-lbm-batch128 60k",
      "model_dir": "openpi-pi05-lbm-batch128-59999-12-iid-merged-results",
      "group": "architecture",
      "group_label": "Architecture",
      "metric": "CI-MSE",
      "validation_error": 0.00261,
      "success_rate": 0.5333333333333333,
      "validation_rank": 1.0,
      "success_rank": 28.0
    },
    {
      "model": "peft e1 alllinear r8 a16 60k",
      "model_dir": "peft-lbm-e1-alllinear-model-r8-a16-60000-12-iid-merged-results",
      "group": "peft",
      "group_label": "PEFT",
      "metric": "CI-MSE",
      "validation_error": 0.004332,
      "success_rate": 0.03333333333333333,
      "validation_rank": 27.0,
      "success_rank": 1.0
    },
    {
      "model": "peft e2 alllinear r16 a32 60k",
      "model_dir": "peft-lbm-e2-alllinear-model-r16-a32-60000-12-iid-merged-results",
      "group": "peft",
      "group_label": "PEFT",
      "metric": "CI-MSE",
      "validation_error": 0.004356,
      "success_rate": 0.0375,
      "validation_rank": 28.0,
      "success_rank": 2.0
    },
    {
      "model": "peft e3 vlm attn r8 a16 60k",
      "model_dir": "peft-lbm-e3-vlm-attn-r8-a16-60000-12-iid-merged-results",
      "group": "peft",
      "group_label": "PEFT",
      "metric": "CI-MSE",
      "validation_error": 0.003164,
      "success_rate": 0.1125,
      "validation_rank": 17.0,
      "success_rank": 10.5
    },
    {
      "model": "peft e4 vlm attn r4 a8 60k",
      "model_dir": "peft-lbm-e4-vlm-attn-r4-a8-60000-12-iid-merged-results",
      "group": "peft",
      "group_label": "PEFT",
      "metric": "CI-MSE",
      "validation_error": 0.003289,
      "success_rate": 0.1,
      "validation_rank": 20.0,
      "success_rank": 6.0
    },
    {
      "model": "peft e5 vlm attnffn r8 a16 60k",
      "model_dir": "peft-lbm-e5-vlm-attnffn-r8-a16-60000-12-iid-merged-results",
      "group": "peft",
      "group_label": "PEFT",
      "metric": "CI-MSE",
      "validation_error": 0.003193,
      "success_rate": 0.1083333333333333,
      "validation_rank": 18.0,
      "success_rank": 8.5
    },
    {
      "model": "peft e6 vlm attnffn r16 a32 d05 60k",
      "model_dir": "peft-lbm-e6-vlm-attnffn-r16-a32-d05-60000-12-iid-merged-results",
      "group": "peft",
      "group_label": "PEFT",
      "metric": "CI-MSE",
      "validation_error": 0.003162,
      "success_rate": 0.1208333333333333,
      "validation_rank": 16.0,
      "success_rank": 12.0
    },
    {
      "model": "vlm-florence2-base 60k",
      "model_dir": "vlm-florence2-base-60000-12-iid-merged-results",
      "group": "vlm",
      "group_label": "VLM backbone",
      "metric": "CI-MSE",
      "validation_error": 0.003772,
      "success_rate": 0.04583333333333333,
      "validation_rank": 26.0,
      "success_rank": 3.0
    },
    {
      "model": "vlm-florence2-large 60k",
      "model_dir": "vlm-florence2-large-60000-12-iid-merged-results",
      "group": "vlm",
      "group_label": "VLM backbone",
      "metric": "CI-MSE",
      "validation_error": 0.003159,
      "success_rate": 0.1125,
      "validation_rank": 15.0,
      "success_rank": 10.5
    },
    {
      "model": "vlm-paligemma2-3b-mix 120k",
      "model_dir": "vlm-paligemma2-3b-mix-120000-12-iid-merged-results",
      "group": "vlm",
      "group_label": "VLM backbone",
      "metric": "CI-MSE",
      "validation_error": 0.003338,
      "success_rate": 0.1041666666666667,
      "validation_rank": 22.0,
      "success_rank": 7.0
    },
    {
      "model": "vlm-paligemma2-3b-pt 120k",
      "model_dir": "vlm-paligemma2-3b-pt-120000-12-iid-merged-results",
      "group": "vlm",
      "group_label": "VLM backbone",
      "metric": "CI-MSE",
      "validation_error": 0.003441,
      "success_rate": 0.07083333333333333,
      "validation_rank": 24.0,
      "success_rank": 4.0
    },
    {
      "model": "x-vla-lbm-default 100k",
      "model_dir": "x-vla-lbm-default-100000-12-iid-merged-results",
      "group": "x_vla_default_ckpt",
      "group_label": "Training steps",
      "metric": "CI-MSE",
      "validation_error": 0.00277,
      "success_rate": 0.275,
      "validation_rank": 2.5,
      "success_rank": 25.5
    },
    {
      "model": "x-vla-lbm-default 20k",
      "model_dir": "x-vla-lbm-default-20000-12-iid-merged-results",
      "group": "x_vla_default_ckpt",
      "group_label": "Training steps",
      "metric": "CI-MSE",
      "validation_error": 0.003648,
      "success_rate": 0.075,
      "validation_rank": 25.0,
      "success_rank": 5.0
    },
    {
      "model": "x-vla-lbm-default 40k",
      "model_dir": "x-vla-lbm-default-40000-12-iid-merged-results",
      "group": "x_vla_default_ckpt",
      "group_label": "Training steps",
      "metric": "CI-MSE",
      "validation_error": 0.003377,
      "success_rate": 0.1291666666666667,
      "validation_rank": 23.0,
      "success_rank": 13.0
    },
    {
      "model": "x-vla-lbm-default 60k",
      "model_dir": "x-vla-lbm-default-60000-12-iid-merged-results",
      "group": "x_vla_default_ckpt",
      "group_label": "Training steps",
      "metric": "CI-MSE",
      "validation_error": 0.002934,
      "success_rate": 0.225,
      "validation_rank": 12.0,
      "success_rank": 20.5
    },
    {
      "model": "x-vla-lbm-default 80k",
      "model_dir": "x-vla-lbm-default-80000-12-iid-merged-results",
      "group": "x_vla_default_ckpt",
      "group_label": "Training steps",
      "metric": "CI-MSE",
      "validation_error": 0.002788,
      "success_rate": 0.2583333333333334,
      "validation_rank": 4.0,
      "success_rank": 23.5
    },
    {
      "model": "x-vla-lbm-relative 100p",
      "model_dir": "x-vla-lbm-relative-100p-60000-12-iid-merged-results",
      "group": "x_vla_relative_pct",
      "group_label": "Data scale",
      "metric": "CI-MSE",
      "validation_error": 0.002914,
      "success_rate": 0.1875,
      "validation_rank": 11.0,
      "success_rank": 17.5
    },
    {
      "model": "x-vla-lbm-relative 20p",
      "model_dir": "x-vla-lbm-relative-20p-30000-12-iid-merged-results",
      "group": "x_vla_relative_pct",
      "group_label": "Data scale",
      "metric": "CI-MSE",
      "validation_error": 0.003046,
      "success_rate": 0.1083333333333333,
      "validation_rank": 14.0,
      "success_rank": 8.5
    },
    {
      "model": "x-vla-lbm-relative 40p",
      "model_dir": "x-vla-lbm-relative-40p-40000-12-iid-merged-results",
      "group": "x_vla_relative_pct",
      "group_label": "Data scale",
      "metric": "CI-MSE",
      "validation_error": 0.002899,
      "success_rate": 0.1791666666666667,
      "validation_rank": 8.0,
      "success_rank": 16.0
    },
    {
      "model": "x-vla-lbm-relative 60p",
      "model_dir": "x-vla-lbm-relative-60p-50000-12-iid-merged-results",
      "group": "x_vla_relative_pct",
      "group_label": "Data scale",
      "metric": "CI-MSE",
      "validation_error": 0.002908,
      "success_rate": 0.175,
      "validation_rank": 10.0,
      "success_rank": 14.5
    },
    {
      "model": "x-vla-lbm-relative 80p",
      "model_dir": "x-vla-lbm-relative-80p-60000-12-iid-merged-results",
      "group": "x_vla_relative_pct",
      "group_label": "Data scale",
      "metric": "CI-MSE",
      "validation_error": 0.002894,
      "success_rate": 0.2,
      "validation_rank": 7.0,
      "success_rank": 19.0
    },
    {
      "model": "action-head-0.5x 60k",
      "model_dir": "action-head-0.5x-60000-12-iid-merged-results",
      "group": "action_head",
      "group_label": "Action head",
      "metric": "Raw MSE",
      "validation_error": 0.0079376781359314,
      "success_rate": 0.175,
      "validation_rank": 23.0,
      "success_rank": 14.5
    },
    {
      "model": "action-head-1.0x 60k",
      "model_dir": "action-head-1.0x-60000-12-iid-merged-results",
      "group": "action_head",
      "group_label": "Action head",
      "metric": "Raw MSE",
      "validation_error": 0.0064488006755709,
      "success_rate": 0.2583333333333334,
      "validation_rank": 9.0,
      "success_rank": 23.5
    },
    {
      "model": "action-head-2.0x 60k",
      "model_dir": "action-head-2.0x-60000-12-iid-merged-results",
      "group": "action_head",
      "group_label": "Action head",
      "metric": "Raw MSE",
      "validation_error": 0.0069539274554699,
      "success_rate": 0.1875,
      "validation_rank": 14.0,
      "success_rank": 17.5
    },
    {
      "model": "action-head-3.0x 80k",
      "model_dir": "action-head-3.0x-80000-12-iid-merged-results",
      "group": "action_head",
      "group_label": "Action head",
      "metric": "Raw MSE",
      "validation_error": 0.006595310755074,
      "success_rate": 0.2875,
      "validation_rank": 12.0,
      "success_rank": 27.0
    },
    {
      "model": "action-head-4.0x 70k",
      "model_dir": "action-head-4.0x-70000-12-iid-merged-results",
      "group": "action_head",
      "group_label": "Action head",
      "metric": "Raw MSE",
      "validation_error": 0.0064989007078111,
      "success_rate": 0.225,
      "validation_rank": 10.0,
      "success_rank": 20.5
    },
    {
      "model": "x-vla-lbm-default 100k",
      "model_dir": "x-vla-lbm-default-100000-12-iid-merged-results",
      "group": "architecture",
      "group_label": "Architecture",
      "metric": "Raw MSE",
      "validation_error": 0.0058731050230562,
      "success_rate": 0.275,
      "validation_rank": 4.5,
      "success_rank": 25.5
    },
    {
      "model": "gr00t-n1.7-lbm-eval-39-train 60k",
      "model_dir": "gr00t-n1.7-lbm-eval-39-train-60000-12-iid-merged-results",
      "group": "architecture",
      "group_label": "Architecture",
      "metric": "Raw MSE",
      "validation_error": 0.0081072626635432,
      "success_rate": 0.2458333333333333,
      "validation_rank": 24.0,
      "success_rank": 22.0
    },
    {
      "model": "openpi-pi05-lbm-batch128 60k",
      "model_dir": "openpi-pi05-lbm-batch128-59999-12-iid-merged-results",
      "group": "architecture",
      "group_label": "Architecture",
      "metric": "Raw MSE",
      "validation_error": 0.0066898622850175,
      "success_rate": 0.5333333333333333,
      "validation_rank": 13.0,
      "success_rank": 28.0
    },
    {
      "model": "peft e1 alllinear r8 a16 60k",
      "model_dir": "peft-lbm-e1-alllinear-model-r8-a16-60000-12-iid-merged-results",
      "group": "peft",
      "group_label": "PEFT",
      "metric": "Raw MSE",
      "validation_error": 0.0100908777676522,
      "success_rate": 0.03333333333333333,
      "validation_rank": 27.0,
      "success_rank": 1.0
    },
    {
      "model": "peft e2 alllinear r16 a32 60k",
      "model_dir": "peft-lbm-e2-alllinear-model-r16-a32-60000-12-iid-merged-results",
      "group": "peft",
      "group_label": "PEFT",
      "metric": "Raw MSE",
      "validation_error": 0.0101893479004502,
      "success_rate": 0.0375,
      "validation_rank": 28.0,
      "success_rank": 2.0
    },
    {
      "model": "peft e3 vlm attn r8 a16 60k",
      "model_dir": "peft-lbm-e3-vlm-attn-r8-a16-60000-12-iid-merged-results",
      "group": "peft",
      "group_label": "PEFT",
      "metric": "Raw MSE",
      "validation_error": 0.0075231222435832,
      "success_rate": 0.1125,
      "validation_rank": 18.0,
      "success_rank": 10.5
    },
    {
      "model": "peft e4 vlm attn r4 a8 60k",
      "model_dir": "peft-lbm-e4-vlm-attn-r4-a8-60000-12-iid-merged-results",
      "group": "peft",
      "group_label": "PEFT",
      "metric": "Raw MSE",
      "validation_error": 0.0078930663876235,
      "success_rate": 0.1,
      "validation_rank": 22.0,
      "success_rank": 6.0
    },
    {
      "model": "peft e5 vlm attnffn r8 a16 60k",
      "model_dir": "peft-lbm-e5-vlm-attnffn-r8-a16-60000-12-iid-merged-results",
      "group": "peft",
      "group_label": "PEFT",
      "metric": "Raw MSE",
      "validation_error": 0.0070444832090288,
      "success_rate": 0.1083333333333333,
      "validation_rank": 15.0,
      "success_rank": 8.5
    },
    {
      "model": "peft e6 vlm attnffn r16 a32 d05 60k",
      "model_dir": "peft-lbm-e6-vlm-attnffn-r16-a32-d05-60000-12-iid-merged-results",
      "group": "peft",
      "group_label": "PEFT",
      "metric": "Raw MSE",
      "validation_error": 0.0071781890001147,
      "success_rate": 0.1208333333333333,
      "validation_rank": 16.0,
      "success_rank": 12.0
    },
    {
      "model": "vlm-florence2-base 60k",
      "model_dir": "vlm-florence2-base-60000-12-iid-merged-results",
      "group": "vlm",
      "group_label": "VLM backbone",
      "metric": "Raw MSE",
      "validation_error": 0.0086209313012659,
      "success_rate": 0.04583333333333333,
      "validation_rank": 26.0,
      "success_rank": 3.0
    },
    {
      "model": "vlm-florence2-large 60k",
      "model_dir": "vlm-florence2-large-60000-12-iid-merged-results",
      "group": "vlm",
      "group_label": "VLM backbone",
      "metric": "Raw MSE",
      "validation_error": 0.007735576480627,
      "success_rate": 0.1125,
      "validation_rank": 20.0,
      "success_rank": 10.5
    },
    {
      "model": "vlm-paligemma2-3b-mix 120k",
      "model_dir": "vlm-paligemma2-3b-mix-120000-12-iid-merged-results",
      "group": "vlm",
      "group_label": "VLM backbone",
      "metric": "Raw MSE",
      "validation_error": 0.0073895663954317,
      "success_rate": 0.1041666666666667,
      "validation_rank": 17.0,
      "success_rank": 7.0
    },
    {
      "model": "vlm-paligemma2-3b-pt 120k",
      "model_dir": "vlm-paligemma2-3b-pt-120000-12-iid-merged-results",
      "group": "vlm",
      "group_label": "VLM backbone",
      "metric": "Raw MSE",
      "validation_error": 0.0077289221808314,
      "success_rate": 0.07083333333333333,
      "validation_rank": 19.0,
      "success_rank": 4.0
    },
    {
      "model": "x-vla-lbm-default 100k",
      "model_dir": "x-vla-lbm-default-100000-12-iid-merged-results",
      "group": "x_vla_default_ckpt",
      "group_label": "Training steps",
      "metric": "Raw MSE",
      "validation_error": 0.0058731050230562,
      "success_rate": 0.275,
      "validation_rank": 4.5,
      "success_rank": 25.5
    },
    {
      "model": "x-vla-lbm-default 20k",
      "model_dir": "x-vla-lbm-default-20000-12-iid-merged-results",
      "group": "x_vla_default_ckpt",
      "group_label": "Training steps",
      "metric": "Raw MSE",
      "validation_error": 0.008507939055562,
      "success_rate": 0.075,
      "validation_rank": 25.0,
      "success_rank": 5.0
    },
    {
      "model": "x-vla-lbm-default 40k",
      "model_dir": "x-vla-lbm-default-40000-12-iid-merged-results",
      "group": "x_vla_default_ckpt",
      "group_label": "Training steps",
      "metric": "Raw MSE",
      "validation_error": 0.0078352126292884,
      "success_rate": 0.1291666666666667,
      "validation_rank": 21.0,
      "success_rank": 13.0
    },
    {
      "model": "x-vla-lbm-default 60k",
      "model_dir": "x-vla-lbm-default-60000-12-iid-merged-results",
      "group": "x_vla_default_ckpt",
      "group_label": "Training steps",
      "metric": "Raw MSE",
      "validation_error": 0.0065301926806569,
      "success_rate": 0.225,
      "validation_rank": 11.0,
      "success_rank": 20.5
    },
    {
      "model": "x-vla-lbm-default 80k",
      "model_dir": "x-vla-lbm-default-80000-12-iid-merged-results",
      "group": "x_vla_default_ckpt",
      "group_label": "Training steps",
      "metric": "Raw MSE",
      "validation_error": 0.0061160183977335,
      "success_rate": 0.2583333333333334,
      "validation_rank": 8.0,
      "success_rank": 23.5
    },
    {
      "model": "x-vla-lbm-relative 100p",
      "model_dir": "x-vla-lbm-relative-100p-60000-12-iid-merged-results",
      "group": "x_vla_relative_pct",
      "group_label": "Data scale",
      "metric": "Raw MSE",
      "validation_error": 0.0060219238512218,
      "success_rate": 0.1875,
      "validation_rank": 7.0,
      "success_rank": 17.5
    },
    {
      "model": "x-vla-lbm-relative 20p",
      "model_dir": "x-vla-lbm-relative-20p-30000-12-iid-merged-results",
      "group": "x_vla_relative_pct",
      "group_label": "Data scale",
      "metric": "Raw MSE",
      "validation_error": 0.005583347287029,
      "success_rate": 0.1083333333333333,
      "validation_rank": 1.0,
      "success_rank": 8.5
    },
    {
      "model": "x-vla-lbm-relative 40p",
      "model_dir": "x-vla-lbm-relative-40p-40000-12-iid-merged-results",
      "group": "x_vla_relative_pct",
      "group_label": "Data scale",
      "metric": "Raw MSE",
      "validation_error": 0.0056860842742025,
      "success_rate": 0.1791666666666667,
      "validation_rank": 3.0,
      "success_rank": 16.0
    },
    {
      "model": "x-vla-lbm-relative 60p",
      "model_dir": "x-vla-lbm-relative-60p-50000-12-iid-merged-results",
      "group": "x_vla_relative_pct",
      "group_label": "Data scale",
      "metric": "Raw MSE",
      "validation_error": 0.0056134168989956,
      "success_rate": 0.175,
      "validation_rank": 2.0,
      "success_rank": 14.5
    },
    {
      "model": "x-vla-lbm-relative 80p",
      "model_dir": "x-vla-lbm-relative-80p-60000-12-iid-merged-results",
      "group": "x_vla_relative_pct",
      "group_label": "Data scale",
      "metric": "Raw MSE",
      "validation_error": 0.0059090447612106,
      "success_rate": 0.2,
      "validation_rank": 6.0,
      "success_rank": 19.0
    }
  ],
  "overall_stats": [
    {
      "metric": "CI-MSE",
      "n": 28,
      "pearson_r": -0.7426654542777805,
      "spearman_rho": -0.8654797443917813
    },
    {
      "metric": "Raw MSE",
      "n": 28,
      "pearson_r": -0.5593652797560629,
      "spearman_rho": -0.6063015746562241
    }
  ],
  "workbook_stats": [
    {
      "cohort": "original_25",
      "variant": "CI-MSE",
      "n": 25,
      "n_unique_metric": 25,
      "n_unique_success": 19,
      "pearson_r": -0.809605442172414,
      "pearson_p": 9.497231177646838e-07,
      "spearman_rho": -0.8906436439275457,
      "spearman_p": 2.454403636941564e-09,
      "status": "ok",
      "metric_definition": "CI-MSE median for H=4, W=12, B=10, E=30",
      "cohort_definition": "non-architecture 25 models"
    },
    {
      "cohort": "original_25",
      "variant": "Raw MSE",
      "n": 25,
      "n_unique_metric": 25,
      "n_unique_success": 19,
      "pearson_r": -0.7394933655734716,
      "pearson_p": 2.403061826889913e-05,
      "spearman_rho": -0.7088953516950331,
      "spearman_p": 7.289724155882606e-05,
      "status": "ok",
      "metric_definition": "Raw MSE baseline from ablation raw-mse aggregate; architecture fallback from iid_correlation_v0.xlsx",
      "cohort_definition": "non-architecture 25 models"
    },
    {
      "cohort": "full_27",
      "variant": "CI-MSE",
      "n": 27,
      "n_unique_metric": 27,
      "n_unique_success": 21,
      "pearson_r": -0.6767134999096484,
      "pearson_p": 0.0001062655573010837,
      "spearman_rho": -0.8362362205100011,
      "spearman_p": 5.577626984015075e-08,
      "status": "ok",
      "metric_definition": "CI-MSE median for H=4, W=12, B=10, E=30",
      "cohort_definition": "all 27 rows from configs/unified_27_models.csv"
    },
    {
      "cohort": "full_27",
      "variant": "Raw MSE",
      "n": 27,
      "n_unique_metric": 27,
      "n_unique_success": 21,
      "pearson_r": -0.5423727066895132,
      "pearson_p": 0.003470275357300474,
      "spearman_rho": -0.612588097231477,
      "spearman_p": 0.0006822347554739838,
      "status": "ok",
      "metric_definition": "Raw MSE baseline from ablation raw-mse aggregate; architecture fallback from iid_correlation_v0.xlsx",
      "cohort_definition": "all 27 rows from configs/unified_27_models.csv"
    }
  ],
  "sensitivity": [],
  "default_config": {
    "ensemble_horizon": 4,
    "dtw_window_size": 12,
    "interval_extend": 10,
    "horizon_end": 30,
    "manifest": "configs/unified_27_models.csv",
    "models_root": "results/hparam_grid_extended27",
    "raw_mse_source": "iid_correlation_v0.xlsx",
    "raw_mse_joined_rows": "results/hparam_sensitivity_unified25/_aggregate/ablation_success_correlation_with_raw_mse/joined_rows.csv",
    "success_field": "all_success_rate",
    "note": "gr00t-n1.7-lbm-eval-39-train-60000-12-iid-merged-results uses existing metric source gr00t-n1.7-lbm-eval-39-train-50000-12-iid-merged-results"
  }
};
