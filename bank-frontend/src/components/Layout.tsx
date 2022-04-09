import * as React from 'react';
import { BankAccount } from '../model';
import Footer from './Footer';
import MainContent from './MainContent';
import Navbar from './Navbar';

interface LayoutProps {
    bankAccount?: BankAccount;
}

const Layout: React.FunctionComponent<React.PropsWithChildren<LayoutProps>> = (props) => {
    const { bankAccount } = props;

    return (
        <>
            <Navbar bankAccount={bankAccount}></Navbar>

            <MainContent>{props.children}</MainContent>

            <Footer></Footer>
        </>
    )
}

export default Layout;