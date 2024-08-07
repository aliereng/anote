import Parameter from "./Parameter";
import SampleType from "./SampleType";

export default interface Sample {
    _id: string,
    name: string,
    sampleType: SampleType,
    acceptDate: Date,
    parameters: Parameter[]
}