import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './entities/factura.entity';
import { CreateFacturaDto } from './dto/create-factura.dto';

@Injectable()
export class FacturacionService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
  ) {}

  async crear(createFacturaDto: CreateFacturaDto) {
    // Lógica de numeración automática
    const ultimaFactura = await this.facturaRepository.findOne({
      where: {},
      order: { fechaEmision: 'DESC' },
    });

    let siguienteNumero: string;
    if (!ultimaFactura) {
      siguienteNumero = 'FAC-1001';
    } else {
      const ultimoNumeroStr = ultimaFactura.numero.split('-')[1];
      const proximoNumero = parseInt(ultimoNumeroStr) + 1;
      siguienteNumero = `FAC-${proximoNumero}`;
    }

    const nuevaFactura = this.facturaRepository.create({
      ...createFacturaDto,
      numero: siguienteNumero,
    });

    return await this.facturaRepository.save(nuevaFactura);
  }

  // ESTE ES EL MÉTODO QUE TE MARCABA ERROR
  async obtenerTodas() {
    return await this.facturaRepository.find({
      order: { fechaEmision: 'DESC' },
    });
  }

  // ESTE ES EL OTRO MÉTODO QUE TE MARCABA ERROR
  async eliminar(id: string) {
    return await this.facturaRepository.delete(id);
  }
}