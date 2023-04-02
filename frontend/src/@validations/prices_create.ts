export interface Validation {
    title?: string,
}

export const validation = (values: Validation) => {
    let errors: Validation = {};

    const check = (key: any) => key in values;

    if(check("title")){
        if(!values.title) {
            errors.title = "required";
        }
    } 

    return errors
}

export default validation