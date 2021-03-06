import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import IAppointmentsRespository from '../repositories/IApppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

// Return an array of objects with the format {day, available}
type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRespository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    // Get all the appointments from a provider
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        month,
        year,
      },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    // Create empty array with length equal to the number of days in the month, and make each position correspond to a day eachDayArray[0] = 1
    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      // Return all the appointments that a provider has on this day
      const appointmentsInDay = appointments.filter(
        appointment => getDate(appointment.date) === day,
      );

      // If the provider has less than 10 appointments on a day, it has at least one available hour
      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
