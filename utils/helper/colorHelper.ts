export const getColor=(color: string,)=>{

    switch(color){
        case 'darkGrey':
    return {bgColor: '#333', color: '#fff'}
        case 'lightBeige':
    return {bgColor: '#f0dfd3', color: '#333'}
        case 'beige':
    return  {bgColor: '#e2cec0', color: '#333'}
        default: return {bgColor: '#fff', color: '#333'}}
}