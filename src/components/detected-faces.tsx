import Image from "next/image";
import { type FacesDetected } from "../app/detect/page";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from "./ui/item";

interface FaceDetected {
    facesDetected: FacesDetected[];
}
export default function FacesDetected({ facesDetected }: FaceDetected) {
    return (
        <div className="w-full">
            <ItemGroup className="gap-2">
                {facesDetected.map((face) => {
                    return (
                        <Item key={face.tempId} variant="outline">
                            <ItemMedia variant="icon" className="h-12 w-12">
                                <Image
                                    src={face.image}
                                    width={100}
                                    height={100}
                                    alt="face"
                                />
                            </ItemMedia>
                            <ItemContent>
                                {/* <ItemTitle>
                                {user.name}
                            </ItemTitle>
                            <ItemDescription>
                                {studentId} | {course} | {level}
                            </ItemDescription> */}
                            </ItemContent>
                        </Item>
                    );
                })}
            </ItemGroup>
        </div>
    );
}
