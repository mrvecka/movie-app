import CustomTextInput from "@/components/CustomTextInput";
import { useState } from "react";

const GameIndex = () => {
  const [characterName, setCharacterName] = useState("");
  const [characterAlias, setCharacterAlias] = useState("Alias");
  const [characterType, setCharacterType] = useState("Type");

  return (
    <div>
      <h1>Game character setup</h1>
      <div className="flex flex-col space-y-4 items-start">
        Required field with basic validation
        <CustomTextInput
          value={characterName}
          label={"Name"}
          placeholder="Enter your name"
          onInputChange={(value) => setCharacterName(value)}
          required
        ></CustomTextInput>
      </div>
      <div className="flex flex-col space-y-4 items-start">
        Optional field
        <CustomTextInput
          value={characterAlias}
          label={"Alias"}
          placeholder="Enter your alias"
          onInputChange={(value) => setCharacterAlias(value)}
        ></CustomTextInput>
      </div>
      <div className="flex flex-col space-y-4 items-start">
        Disabled field
        <CustomTextInput
          value={characterType}
          label={"Character type"}
          placeholder="Enter your type"
          onInputChange={(value) => setCharacterType(value)}
          disabled
        ></CustomTextInput>
      </div>
    </div>
  );
};

export default GameIndex;
