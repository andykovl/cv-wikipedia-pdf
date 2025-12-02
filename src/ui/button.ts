export type ButtonVariant = "default" | "outline";

export function createButton(
  label: string,
  props: { variant?: ButtonVariant; onClick?: () => void; icon?: string } = {},
): HTMLButtonElement {
  const btn = document.createElement("button");

  const base =
    "cursor-pointer inline-flex items-center justify-center rounded-md font-medium " +
    "h-10 px-4 py-2 transition-colors focus:outline-none " +
    "disabled:opacity-50 disabled:pointer-events-none";

  const variants: Record<ButtonVariant, string> = {
    default: "bg-black text-white hover:bg-neutral-800",
    outline: "border border-neutral-300 hover:bg-neutral-100",
  };

  const variant = props.variant ?? "default";

  btn.className = `${base} ${variants[variant]}`;

  if (props.icon) {
    const iconWrapper = `<span class="mr-2 [&>svg]:w-4 [&>svg]:h-4">${props.icon}</span>`;
    btn.innerHTML = `${iconWrapper}${label}`;
  } else {
    btn.textContent = label;
  }

  if (props.onClick) {
    btn.addEventListener("click", props.onClick);
  }

  return btn;
}
