import { Inter, Roboto } from "next/font/google";

const inter_int = Inter({
  subsets: ["latin"],
  variable: "--font-latin",
});
const roboto_init = Roboto({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-roboto",
});

export const roboto = roboto_init.variable;
export const inter = inter_int.variable;
