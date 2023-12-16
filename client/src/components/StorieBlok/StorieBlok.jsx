

export const StorieBlok = ({src, name}) =>{

    return(
        <div>
            <div>
                <img src={src} alt="" />
            </div>
            <span>
                {name}
            </span>
        </div>
    )
}