export default function CategoryDivision({name}){
    return (
        <div className="w-full h-10 bg-amber-900 flex justify-center items-center rounded-sm" id={name}>
            {name}
        </div>
    )
}