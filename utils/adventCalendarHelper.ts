export const isReadyToOpen =(day:number)=>{
    const date = new Date()
    const today = date.getDate()
    const month = date.getMonth()
    const DEZ_MONTH = 8
    return month === DEZ_MONTH && today >= day
}