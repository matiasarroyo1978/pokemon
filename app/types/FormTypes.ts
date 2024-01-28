import { ErrorOption } from "react-hook-form";

export type InputFieldT = {
    type: string,
    name: string,
    placeholder: string,
    label: string,
    register: any,
    error: undefined | ErrorOption
}