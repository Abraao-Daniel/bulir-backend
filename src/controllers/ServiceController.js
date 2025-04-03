import Service from '../models/Service.js';

class ServiceController {
  async create(req, res) {
    try {
      const { name, description, price, user } = req.body;
      // const providerId = req.user.id;

      // if (req.user.userType !== 'provider') {
      //   return res.status(403).json({ error: 'Only providers can create services' });
      // }

      const service = await Service.create({
        name,
        description,
        price,
        providerId:user 
      });

      return res.status(201).json(service);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async list(req, res) {
    try {
      const services = await Service.findAll({
        include: ['provider']
      });
      return res.json(services);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async findOne(req, res) {
    const id = req.body.id
    try {
      const services = await Service.findOne(id);
      return res.json(services);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

}

export default new ServiceController();