// temp.service.js

import { tempResponseDTO, flagResponseDTO } from "file:///C:/UMC-Node.js/test3/src/dtos/temp.response.dto.js";
import { BaseError } from "file:///C:/UMC-Node.js/test3/config/error.js";
import { status } from "file:///C:/UMC-Node.js/test3/config/response.status.js";

export const getTempData = () => {
    return tempResponseDTO("This is TEST! >.0");
}

export function CheckFlag(flag) {
        if (flag == 1)
        throw new BaseError(status.UNAUTHORIZED);   // 에러 발생시키기
    else {
        return flagResponseDTO(flag);
    }
    
}
