import { useState } from "react";
import classNames from "classnames";
import { Button } from "@material-tailwind/react";
import Typing from "../../components/Typing";

interface HomeProps {
    className?: string;
}

export const Home = ({className}: HomeProps) => {
    const [count, setCount] = useState(0);

    return <div className={classNames("container mx-auto", className)}>
    <div className="flex w-max gap-4 p-5">
    <Typing />
      <Button
        placeholder={"What"}
        variant="gradient"
        color="amber"
        onClick={() => setCount(count + 1)}>

        Click me, if you can?
      </Button>
    </div>
    <h1 className="pl-10 color-red flex flex-center">{count}</h1>
  </div>
}

export default Home;