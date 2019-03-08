import Typography from "typography";
import fairyGatesTheme from "typography-theme-fairy-gates";

fairyGatesTheme.overrideThemeStyles = () => ({
  a: {
    textShadow: 0
  }
});

export default new Typography(fairyGatesTheme);
