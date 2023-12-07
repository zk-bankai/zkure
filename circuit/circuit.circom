pragma circom 2.1.5;
include "node_modules/circomlib/circuits/comparators.circom";
template VaccineParamsCheck() {
    signal input preservative;
    signal input adjuvant;
    signal input stabilizer;
    signal input excipient;
    signal output isValid;

    signal preservative_valid;
    signal adjuvant_valid;
    signal stabilizer_valid;
    signal excipient_valid;

    component LT1 = LessThan(32);
    component GT1 = GreaterThan(32);

    component LT2 = LessThan(32);
    component GT2 = GreaterThan(32);

    component LT3 = LessThan(32);
    component GT3 = GreaterThan(32);

    component LT4 = LessThan(32);
    component GT4 = GreaterThan(32);

    LT1.in[0] <== preservative;
    LT1.in[1] <== 200;

    GT1.in[0] <== preservative;
    GT1.in[1] <== 100;

    preservative_valid <== LT1.out*GT1.out;

    LT2.in[0] <== adjuvant;
    LT2.in[1] <== 8500;

    GT2.in[0] <== adjuvant;
    GT2.in[1] <== 0;

    adjuvant_valid <== LT2.out*GT2.out;

    LT3.in[0] <== stabilizer;
    LT3.in[1] <== 50000;

    GT3.in[0] <== stabilizer;
    GT3.in[1] <== 1000;

    stabilizer_valid <== LT3.out*GT3.out;

    LT4.in[0] <== excipient;
    LT4.in[1] <== 90000;

    GT4.in[0] <== excipient;
    GT4.in[1] <== 5000;

    excipient_valid <== LT4.out*GT4.out;

     signal int1 <== preservative_valid*adjuvant_valid;
     signal int2 <== stabilizer_valid*adjuvant_valid;
    
    isValid <== int1*int2;
    
}
component main = VaccineParamsCheck();
