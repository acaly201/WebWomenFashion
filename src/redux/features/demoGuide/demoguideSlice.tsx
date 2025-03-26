import { createAppSlice } from "@/redux/createAppSlice";

export interface ShowState {
  showDemoGuide: boolean;
  shrinkDemoGuide: boolean;
  showSelect: boolean;
  dataSelect: string | undefined;
  status: "idle" | "loading" | "failed";
}

const initialState: ShowState = {
  showDemoGuide: false,
  shrinkDemoGuide: true,
  showSelect: true,
  dataSelect: undefined,
  status: "idle",
};

export const demoGuide = createAppSlice({
  name: "statusDemoGuide",
  initialState,
  reducers: {
    showDemo: (state) => {
      state.showDemoGuide = !state.showDemoGuide;
      state.showSelect = true
    },
    shrinkDemoGuide: (state) => {
      state.shrinkDemoGuide = !state.shrinkDemoGuide;
    },
    showSelect: (state, data) => {
      if (data) {
        state.dataSelect = data.payload;
      }
    state.showSelect = !state.showSelect

      
    },
  },

  selectors: {
    selectShowDemo: (value) => value.showDemoGuide,
    selectShrinkDemoGuide: (value) => value.shrinkDemoGuide,
    selectStatus: (value) => value.status,
    selectShowSelect: (value) => value.showSelect,
    selectDataShowSelect: (value) => value.dataSelect,
  },
});

export const { shrinkDemoGuide, showDemo, showSelect } = demoGuide.actions;

export const {
  selectShowDemo,
  selectStatus,
  selectShrinkDemoGuide,
  selectShowSelect,
  selectDataShowSelect,
} = demoGuide.selectors;
