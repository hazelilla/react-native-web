import { PERMISSIONS, request, PermissionStatus } from 'react-native-permissions';

export type PermissionType = keyof typeof PERMISSIONS.IOS;

export const requestPermission = async (permissionType: PermissionType): Promise<PermissionStatus> => {
  const status = await request(PERMISSIONS.IOS[permissionType]);

  if (status === 'granted') {
    console.log(`Permission ${permissionType} granted`);
  } else {
    console.log(`Permission ${permissionType} denied or restricted`);
  }

  return status;
};
