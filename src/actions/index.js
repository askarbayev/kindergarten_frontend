import {
    DOC_CREATE_PENDING,
    DOC_CREATE_SUCCESS,
    DOC_CREATE_FAILURE

} from '../constants/actionTypes'


const createDocPending = ()=>{
    return {
        type: DOC_CREATE_PENDING
    }
}

const createDocSuccess = (data)=>{
    return {
        type: DOC_CREATE_SUCCESS,
        payload: data
    }
}

const createDocFailure = (error)=>{
    return {
        type: DOC_CREATE_FAILURE,
        error
    }
}

export const createDoc = (graphqlQuery) => {

   /*  const graphqlQuery = `mutation{
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({query:graphqlQuery})
    }

    return async (dispatch)=>{
        dispatch(createDocPending())
        try{
            let response = await fetch('http://localhost:5000/doc', request_body)
            let data = await response.json()
            dispatch(createDocSuccess(await data))
        }
        catch(error){
            dispatch(createDocFailure(error))
        }
    } 
}