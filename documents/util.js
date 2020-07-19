export function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

export function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

export function stripTemplate(content) {
  content = content.trim();
  if (!content) {
    return content;
  }
  const tplScripts = content.match(/<(script)[\s\S]+?<\/\1>/g)
  content = content.replace(/<(script|style)[\s\S]+?<\/\1>/g, '').trim()
  if (tplScripts && tplScripts.length>0) {
    for (let i = 0; i < tplScripts.length; i++) {
      if (tplScripts[i].indexOf('text/html') !== -1) {
        content += '\n' + tplScripts[i].trim()
      }
    }
  }

  return content.trim();
}
