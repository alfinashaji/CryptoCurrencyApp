export const initialValue = {
  theme: {
    bgColor: "#0D1421",
    tableHeadBgColor: "#222531",
    fontColor: "#FAFAFA",
    boxColor: "#171b2e",
    buttonColor: "#222531",
    buttonSelected: "#323546",
    borderColor: "#19243a",
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
          bgColor: newMode === "dark" ? "#0D1421" : "white",
          tableHeadBgColor:
            newMode === "dark"
              ? "#222531"
              : "linear-gradient(to bottom, #E0F7FA, #80DEEA)",
          fontColor: newMode === "dark" ? "#FAFAFA" : "#000000",
          boxColor: newMode === "dark" ? "#171b2e" : "#fff",
          buttonColor: newMode === "dark" ? "#222531" : "#878788",
          buttonSelected: newMode === "dark" ? "#323546" : "#616161",
          borderColor: newMode === "dark" ? "#19243a" : "#e5e8ef",
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
