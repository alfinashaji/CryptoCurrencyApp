export const initialValue = {
  theme: {
    bgColor: "#0D1421",
    tableHeadBgColor: "#222531",
    fontColor: "#FAFAFA",
    borderColor: "#2961B4",
    buttonColor: "#222531",
    buttonSelected: "#323546",
    mode: "dark",
  },
  data: {
    coins: [],
  },
  searchValue: "", // Add this to initial state
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case "colorchange":
      const newMode = state.theme.mode === "dark" ? "light" : "dark";
      return {
        ...state,
        theme: {
          mode: newMode,
          bgColor: newMode === "dark" ? "#0D1421" : "#E0E0E0",
          tableHeadBgColor:
            newMode === "dark"
              ? "#222531"
              : "linear-gradient(to bottom, #E0F7FA, #80DEEA)",
          fontColor: newMode === "dark" ? "#FAFAFA" : "#000000",
          borderColor: newMode === "dark" ? "#2961B4" : "#2B717A",
          buttonColor: newMode === "dark" ? "#222531" : "#878788",
          buttonSelected: newMode === "dark" ? "#323546" : "#616161",
        },
      };

    case "FETCH_COINS_REQUEST":
      return {
        ...state,
        data: {
          coins: action.payload,
        },
      };

    case "SEARCH_VALUE":
      return {
        ...state,
        searchValue: action.payload,
      };

    default:
      return state;
  }
};
