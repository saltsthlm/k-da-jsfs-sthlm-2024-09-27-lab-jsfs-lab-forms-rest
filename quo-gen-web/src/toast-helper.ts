export const showErrorToast = (message: string) => {
  const toastTemplate = document.getElementById(
    "toast-template",
  ) as HTMLTemplateElement;
  if (!toastTemplate) return;
  const toastClone = document.importNode(toastTemplate.content, true);
  document.body.appendChild(toastClone);
  const newToast = document.body.lastElementChild;
  if (!newToast) return;
  newToast.textContent = message;
  setTimeout(() => {
    newToast.classList.add("fade-in");
  }, 10);
  setTimeout(() => {
    newToast.remove();
  }, 3000);
};
