import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IApppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../entities/Appointment';

// Have more control over our repository and how it works, so that if we need to change TypeORM we can still maintain our repo and services - define all methods we will need, and inside them we can use the repository provided by typeorm and its methods
class AppointmentsRepository implements IAppointmentsRepository {
  // Declare a private variable for the repository from TypeORM - Repository for model Appointment
  private ormRepository: Repository<Appointment>;

  // Initialize our repository with te base repo from typeorm
  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    // Create appointment
    const appointment = this.ormRepository.create({
      provider_id,
      date,
    });

    // Save appointment on database
    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
