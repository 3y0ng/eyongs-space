import { ReactNode } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => (
  <div className="animate-in fade-in duration-300">{children}</div>
);

export default PageTransition;
