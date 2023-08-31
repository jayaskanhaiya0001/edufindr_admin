import "./nav.css";
export const Navigation = ({navigationHandle}) => {
    const NavItem = ['Course', 'TestSeries', 'Teacher', 'Blog', 'Freebies']
    return (
        <>
            <ul className="NavBar">
                {
                    NavItem?.map((data) => {
                        return (
                            <>
                                <li onClick={() => navigationHandle(data)}>{data}</li>
                            </>
                        )
                    })
                }
            </ul>


        </>
    )
}