import { UIFormControl } from "@/components/ui/form-control";
import { View } from "@gluestack-ui/themed";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { supabase } from "@/utils/supabase";
import { Select } from "@/components/ui/select";

const completeProfile = () => {
  const [code, setCode] = useState("");
  const [isValidated, setIsValidated] = useState(false);


  const [Organization, setOrganization] = useState(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [name, setName] = useState("");
  


  const validateCode = async () => {
    console.log(code)

    let { data: org, error } = await supabase
    .from('Organization')
    .select("*")
    .eq('VAT_number', code)
    .maybeSingle();

    console.log(org);
    if (org) {
        setOrganization(org);
        setIsValidated(true);
    }
  }

    return (
    <View className="flex justify-center items-center p-4">
        <Text>Configuración de nuevo Usuario</Text>

        {!isValidated && (
            <UIFormControl
                isRequired
                isInvalid={isInvalid}
            >
                <Input>
                <InputField
                    value={code}
                    onChangeText={setCode}
                    // onBlur={() => setTouched(true)}
                    placeholder="Codigo de empresa"
                />
                </Input>
                <Button onPress={validateCode}>
                    <ButtonText>Validar codigo de empresa</ButtonText>
                </Button>

            </UIFormControl>
        )}
        {isValidated && (
            <View className="flex justify-center items-center p-4">
                <UIFormControl
                    isRequired
                    isInvalid={isInvalid}
                >
                    <Input>
                        <InputField
                            value={name}
                            onChangeText={setName}
                            // onBlur={() => setTouched(true)}
                            placeholder="Nombre"
                        />
                    </Input>

                    <Select

                    >

                    </Select>

                    <Button onPress={validateCode}>
                        <ButtonText>Guardar</ButtonText>
                    </Button>
                </UIFormControl>
            </View>
        )}
        </View>
    )
}

export default completeProfile;