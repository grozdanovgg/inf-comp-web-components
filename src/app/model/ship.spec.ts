import { Ship } from 'src/app/model/ship';

describe('Ship', () => {
    let ship: Ship;

    beforeEach(() => {
        ship = new Ship({});
    });

    describe('extractRef()', () => {
        it('12345567890 should return unknown', () => {
            ship.ShipID = '12345567890';
            expect(ship['extractRef']('generation')).toBe('unknown ship');
        });

        it('0101020201000600000001 should return generation PL', () => {
            ship.ShipID = '0101020201000600000001';
            expect(ship['extractRef']('generation')).toBe('PL');
        });

        it('0101000201000600000001 should return UKNOWN', () => {
            ship.ShipID = '0101000201000600000001';
            expect(ship['extractRef']('generation')).toBe('UNKNOWN');
        });

        it('0101010201000600000001 should return CG generation', () => {
            ship.ShipID = '0101010201000600000001';
            expect(ship['extractRef']('generation')).toBe('CG');
        });

        it('0101020201000600000001 should return VRS type', () => {
            ship.ShipID = '0101020201000600000001';
            expect(ship['extractRef']('type')).toBe('VRS');
        });

        it('0101020200000600000001 should return ERR type', () => {
            ship.ShipID = '0101020200000600000001';
            expect(ship['extractRef']('type')).toBe('ERR');
        });

        it('0101020203000600000001 should return CNN type', () => {
            ship.ShipID = '0101020203000600000001';
            expect(ship['extractRef']('type')).toBe('CNN');
        });

        it('0101020204000600000001 should return CRR type', () => {
            ship.ShipID = '0101020204000600000001';
            expect(ship['extractRef']('type')).toBe('CRR');
        });

        it('010102020a000600000001 should return GRD type', () => {
            ship.ShipID = '010102020a000600000001';
            expect(ship['extractRef']('type')).toBe('GRD');
        });

        it('010102020b000600000001 should return BLL type', () => {
            ship.ShipID = '010102020b000600000001';
            expect(ship['extractRef']('type')).toBe('BLL');
        });

        it('010102020c000600000001 should return LCR type', () => {
            ship.ShipID = '010102020c000600000001';
            expect(ship['extractRef']('type')).toBe('LCR');
        });

        it('010102020d000600000001 should return HYD type', () => {
            ship.ShipID = '010102020d000600000001';
            expect(ship['extractRef']('type')).toBe('HYD');
        });

        it('010102020e000600000001 should return NVY type', () => {
            ship.ShipID = '010102020e000600000001';
            expect(ship['extractRef']('type')).toBe('NVY');
        });

        it('010102020f000600000001 should return WHR type', () => {
            ship.ShipID = '010102020f000600000001';
            expect(ship['extractRef']('type')).toBe('WHR');
        });

        it('0101020210000600000001 should return CLV type', () => {
            ship.ShipID = '0101020210000600000001';
            expect(ship['extractRef']('type')).toBe('CLV');
        });

        it('0101020211000600000001 should return BST type', () => {
            ship.ShipID = '0101020211000600000001';
            expect(ship['extractRef']('type')).toBe('BST');
        });

        it('0101020212000600000001 should return DVS type', () => {
            ship.ShipID = '0101020212000600000001';
            expect(ship['extractRef']('type')).toBe('DVS');
        });

        it('0101020213000600000001 should return PRS type', () => {
            ship.ShipID = '0101020213000600000001';
            expect(ship['extractRef']('type')).toBe('PRS');
        });

        it('0101020013000600000001 should return ERR class', () => {
            ship.ShipID = '0101020013000600000001';
            expect(ship['extractRef']('class')).toBe('ERR');
        });

        it('0101020113000600000001 should return TT class', () => {
            ship.ShipID = '0101020113000600000001';
            expect(ship['extractRef']('class')).toBe('TT');
        });

        it('0101020213000600000001 should return CN class', () => {
            ship.ShipID = '0101020213000600000001';
            expect(ship['extractRef']('class')).toBe('CN');
        });

        it('0101020313000600000001 should return CR class', () => {
            ship.ShipID = '0101020313000600000001';
            expect(ship['extractRef']('class')).toBe('CR');
        });

        it('0101020413000600000001 should return DD class', () => {
            ship.ShipID = '0101020413000600000001';
            expect(ship['extractRef']('class')).toBe('DD');
        });

        it('0101020513000600000001 should return MM class', () => {
            ship.ShipID = '0101020513000600000001';
            expect(ship['extractRef']('class')).toBe('MM');
        });
    });

    describe('convertToAZNotation()', () => {

        it('should convert throw an error for id: 0', () => {
            ship.InstanceID = '0';
            expect(ship['convertToAZNotation']()).toBe('id below zero');
        });

        it('should convert 1 to A0001', () => {
            ship.InstanceID = '1';
            expect(ship['convertToAZNotation']()).toBe('A0001');
        });

        it('should convert 3E7 to A0999', () => {
            ship.InstanceID = '3E7';
            expect(ship['convertToAZNotation']()).toBe('A0999');
        });

        it('should convert 270F to A9999', () => {
            ship.InstanceID = '270F';
            expect(ship['convertToAZNotation']()).toBe('A9999');
        });

        it('should convert 2710 to B0001', () => {
            ship.InstanceID = '2710';
            expect(ship['convertToAZNotation']()).toBe('B0001');
        });

        it('should convert 2711 to B0002', () => {
            ship.InstanceID = '2711';
            expect(ship['convertToAZNotation']()).toBe('B0002');
        });

        it('should convert 752D to C9999', () => {
            ship.InstanceID = '752D';
            expect(ship['convertToAZNotation']()).toBe('C9999');
        });

        it('should convert 9C3F to E0003', () => {
            ship.InstanceID = '9C3F';
            expect(ship['convertToAZNotation']()).toBe('E0003');
        });

        it('should convert 3D077 to Y9999', () => {
            ship.InstanceID = '3D077';
            expect(ship['convertToAZNotation']()).toBe('Y9999');
        });

        it('should convert 3D078 to Z0001', () => {
            ship.InstanceID = '3D078';
            expect(ship['convertToAZNotation']()).toBe('Z0001');
        });

        it('should convert 3D079 to Z0002', () => {
            ship.InstanceID = '3D079';
            expect(ship['convertToAZNotation']()).toEqual('Z0002');
        });

        it('should convert 3F786 to Z9999', () => {
            ship.InstanceID = '3F786';
            expect(ship['convertToAZNotation']()).toBe('Z9999');
        });

        it('should convert 3F787 to Z10000', () => {
            ship.InstanceID = '3F787';
            expect(ship['convertToAZNotation']()).toBe('Z10000');
        });

        it('should convert 3F788 to Z10001', () => {
            ship.InstanceID = '3F788';
            expect(ship['convertToAZNotation']()).toEqual('Z10001');
        });

        it('should convert 927C0 to Z350025', () => {
            ship.InstanceID = '927C0';
            expect(ship['convertToAZNotation']()).toBe('Z350025');
        });
    });

    describe('setTranslatedShipSerialNumber()', () => {
        it('should set SerialNumber to PLVRS-CNMK6-A0001 fromo shipId 0101020201000600000001', () => {
            ship.ShipID = '0101020201000600000001';
            ship.InstanceID = '1';

            ship['setTranslatedShipSerialNumber']();

            expect(ship.SerialNumber).toBe('PLVRS-CNMK6-A0001');
        });

    });
});

