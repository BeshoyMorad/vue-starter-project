export {};
declare global {
  type DefaultPermissions = 'list' | 'detailed_view' | 'create' | 'update' | 'delete';

  interface AppPermissions {
    admins: DefaultPermissions;
    // Add other resources/actions as needed
  }

  type Models = keyof AppPermissions;

  type CanPermission<Model extends Models> =
    | (Model extends Models ? `${Model}.${AppPermissions[Model]}` : never)
    | (Model extends Models ? `${Model}.${AppPermissions[Model]}` : never)[];
}
