const DataProfile = {
    add: async (formData) => {
        const response = await fetch('server/script.php?todo=addProfile', {
            method: 'POST',
            body: formData
        });
        return await response.json();
    }
};