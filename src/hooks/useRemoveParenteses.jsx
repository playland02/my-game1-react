export function useRemoveParenteses(string){
    if(string.includes('(')){
        let index = string.indexOf('(')
        let new_string = string.replace(string.slice(index,string.lenght),'')
        return new_string

    }else{
        return string
    }

}