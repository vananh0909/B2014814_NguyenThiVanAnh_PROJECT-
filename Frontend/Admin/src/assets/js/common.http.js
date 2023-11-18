export const http_getAll = async (objService) => {
    try {
        const documents = await objService.getAll();
        return documents;
    } catch (error) {
        console.log(error);
    }
}

export const http_getOne = async (objService, id) => {
    try {
        const document = await objService.get(id);
        return document;
    } catch (error) {
        console.log(error);
    }
}

export const http_deleteOne = async (objService, id) => {
    try {
        const document = await objService.delete(id);
        return document;
    } catch (error) {
        console.log(error);
    }
}

export const http_create = async (objService, data) => {
    try {
        const document = await objService.create(data);
        return document;
    } catch (error) {
        console.log(error);
    }
}

export const http_update = async (objService, id, data) => {
    try {
        const document = await objService.update(id, data);
        return document;
    } catch (error) {
        console.log(error);
    }
}


