import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import BankAccountCard from "../../components/BankAccountCard";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import { BankAccount } from "../../model";
import { bankHttp } from "../../util/http";

interface BankAccountsListProps {
  bankAccounts: BankAccount[]
}

const BankAccountList: NextPage<BankAccountsListProps> = (props) => {
  const { bankAccounts } = props

  return (
        <Layout>
            <Title>Contas bancárias</Title>
            <div className="row">  
              {bankAccounts.map(account=>(
                <Link key={account.id} href="/bank-accounts/[id]" as={`/bank-accounts/${account.id}`}>
                  <a className="col-12 col-sm-6 col-md-4">
                    <BankAccountCard bankAccount={account}/>
                  </a>
                </Link>
              ))}
            </div>
        </Layout>
  )
}

export default BankAccountList;

export const getServerSideProps: GetServerSideProps = async () => {
  const {data: bankAccounts} = await bankHttp.get('/bank-accounts')

  return {
    props:{
      bankAccounts
    }
  }
}
