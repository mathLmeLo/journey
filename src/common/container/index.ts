import 'reflect-metadata';
import { Container } from 'inversify';

import Types from '@common/container/Types';

import IBusinessManagerProvider from '@common/providers/BusinessManagerProvider/repositories/IBusinessManagerProvider';
import BusinessManagerProvider from '@common/providers/BusinessManagerProvider/implementation/BusinessManagerProvider';

import ICRMProvider from '@common/providers/CRMProvider/repositories/ICRMProvider';
import CRMProvider from '@common/providers/CRMProvider/implementation/CRMProvider';

const container = new Container();

// providers
container.bind<IBusinessManagerProvider>(Types.BusinessManagerProvider).to(BusinessManagerProvider);
container.bind<ICRMProvider>(Types.CRMProvider).to(CRMProvider);

export default container;
