import subitoAppUpdate from "./rules/subitoAppUpdate";

const abac = {
  'SubitoApp.update': subitoAppUpdate,
  'SubitoApp.delete': ['ADMIN'],
  'SubitoApp.create': ['MEMBER'],
  'SubitoApp.read': ['ANYONE'],
}

export default abac;
