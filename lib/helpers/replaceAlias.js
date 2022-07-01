function replaceAlias(str, names) {
  let tr = str;
  tr = tr.replace(/SUBITOAPP/g, names.uc);
  tr = tr.replace(/SubitoApp/g, names.cn);
  tr = tr.replace(/subitoApp/g, names.fn);
  tr = tr.replace(/subitoapp/g, names.lc);
  tr = tr.replace(/subito-app/g, names.rn);
  tr = tr.replace(/subitotype/g, names.type);

  return tr;
}

module.exports = replaceAlias;
