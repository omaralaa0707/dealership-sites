function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function resolvePath(data, keyPath) {
  return keyPath
    .split(".")
    .reduce((acc, key) => (acc == null ? undefined : acc[key]), data);
}

function renderSection(value, body, parentData) {
  if (Array.isArray(value)) {
    return value.map((item) => renderTemplate(body, item)).join("");
  }
  if (value === true) {
    return renderTemplate(body, parentData);
  }
  if (value && typeof value === "object") {
    return renderTemplate(body, value);
  }
  return "";
}

export function renderTemplate(template, data) {
  let output = template.replace(
    /{{#(\w+)}}([\s\S]*?){{\/\1}}/g,
    (_match, key, body) => renderSection(data[key], body, data)
  );

  output = output.replace(/{{([\w.]+)}}/g, (_match, keyPath) => {
    const value = resolvePath(data, keyPath);
    return value === undefined || value === null ? "" : escapeHtml(value);
  });

  return output;
}
