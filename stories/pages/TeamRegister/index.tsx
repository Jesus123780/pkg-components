import React from "react"
import { Column, Text } from "../../atoms"
import { CreditMobilLayout } from "../../Layout/CreditMobilLayout"
import { Imei } from "./IMEI"
import { Scan } from "./Scan"
import styles from "./TeamRegister.module.css"

interface TeamRegisterProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TeamRegister = ({ onChange = () => {} }: TeamRegisterProps) => {
  return (
    <CreditMobilLayout>
      <div className={styles["container"]}>
        <div className={styles["col-1"]}>
          <Column>
            <Column>
              <Text
                customSize="4.0625rem"
                weight="medium"
                color="blue"
                styles={{ marginBottom: "5.9375rem" }}
              >
                Registrar equipo
              </Text>
              <Text
                className={styles["title"]}
                customSize="2.1875rem"
                lineHeight="xl"
                styles={{ margin: "0 0 10px 0" }}
              >
                Puedes utilizar una de estas opciones
              </Text>
            </Column>

            <Scan />

            <Imei onChange={onChange} />
          </Column>
        </div>
        <div className={styles["col-2"]}></div>
      </div>
    </CreditMobilLayout>
  )
}
