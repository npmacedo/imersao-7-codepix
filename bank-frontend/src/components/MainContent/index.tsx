import classes from './MainContent.module.scss'

const MainContent: React.FunctionComponent<React.PropsWithChildren<any>> = (props: any) => {
    return (
        <main className={classes.root}>
            <div className="container">
                {props.children}
            </div>
        </main>
    )
}

export default MainContent;