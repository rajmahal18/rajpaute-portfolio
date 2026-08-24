const configuredOwnerRoute = import.meta.env.VITE_OWNER_MATH_ROUTE;
export const ownerMentalMathRoute = typeof configuredOwnerRoute === "string" && configuredOwnerRoute.startsWith("/")
  ? configuredOwnerRoute.replace(/\/+$/, "") || "/lab/mm-rp-314159"
  : "/lab/mm-rp-314159";
