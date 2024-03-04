

const executeCode = async (code, sessionToken, task_id) => {
    console.log(typeof code, code)
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/compile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${sessionToken}`,
            },
            body: JSON.stringify({
                code: code,
                task_name: task_id
            }),
        });
        const data = await response.json(); // Parse the JSON data from the response
        console.log("Response from server:", data);

        if (response.ok) {
            return data;
        }
    } catch (error) {
        console.error(error);
    }
};

export { executeCode };
