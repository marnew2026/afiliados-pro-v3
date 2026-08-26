import * as Clipboard from "expo-clipboard";
import { Alert } from "react-native";

export async function copyToClipboard(text: string) {
  try {
    await Clipboard.setStringAsync(text);

    Alert.alert(
      "Sucesso",
      "Link copiado!"
    );

  } catch {

    Alert.alert(
      "Erro",
      "Não foi possível copiar."
    );

  }
}