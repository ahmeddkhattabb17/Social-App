export function postForm(body: string, image?: File | null) {
  const form = new FormData();
  form.append("body", body);
  if (image) form.append("image", image);
  return form;
}
