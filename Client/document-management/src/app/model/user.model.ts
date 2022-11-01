
import { Token } from './token.model';
import { UserRole } from './userrole.model';
export class User {
       public id: number;
       public userName: string;
       public userRole?: string;
       public passwordNew? : string;
       public roles?: string;
       public createBy?: string;
       public updateBy?: string;
       public createDate?: string;
       public updateDate?: string;
       public status?: number;
       public roleName: string;
       public menuRole: string;
       public token?: Token = new Token();
       public confirmPassword?: string;
       public roleID?: number;
}

export class UserDTO {
       public userID: number;
       public userName: string;
}

