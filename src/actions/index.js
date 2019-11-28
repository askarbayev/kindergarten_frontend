const createDocPending = pendingType => {
  return {
    type: pendingType
  };
};

const createDocSuccess = (data, successType) => {
  return {
    type: successType,
    payload: data.data
  };
};

const createDocFailure = (error, failureType) => {
  return {
    type: failureType,
    error
  };
};

export const graphqlQuery = (query, pendingType, successType, failureType) => {
  /*  const query = `mutation{
        createDoc(input: {
            title:"How to Create GraphQL with Node JS",
            summary:"it is to create a service",
            sections:[
                {
                    title:"Set up dependencies",
                    text:"It is supper easy to install",
                    subSections:[
                        {
                            title:"Use npm",
                            text:"npm install"
                        },
                        {
                            title:"Use npm",
                            text:"npm install"
                        }
                        ]
                },
                {
                    title:"import dependencies",
                    text:"use es6 import",
                    subSections:[
                        {
                            title:"import on tope",
                            text:"importtt"
                        },
                        {
                            title:"use require",
                            text:"require"
                        }
                        ]
                }
                ]
        })
    }` */

  const request_body = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: query })
  };

  return async dispatch => {
    dispatch(createDocPending(pendingType));
    try {
      let response = await fetch("http://localhost:8080/doc", request_body);
      let data = await response.json();
      dispatch(createDocSuccess(await data, successType));
    } catch (error) {
      dispatch(createDocFailure(error, failureType));
    }
  };
};
