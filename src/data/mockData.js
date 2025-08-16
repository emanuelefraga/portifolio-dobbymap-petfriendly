// Dados mockados para a API DobbMap

let users = [];
let places = [];
let reviews = [];
let favorites = [];

// Gerador de IDs únicos - números sequenciais
let nextUserId = 6; // Começa em 6 pois já temos 5 usuários mockados
let nextPlaceId = 11; // Começa em 11 pois já temos 10 locais mockados
let nextReviewId = 11; // Começa em 11 pois já temos 10 reviews mockados

const generateUserId = () => {
  return nextUserId++;
};

const generatePlaceId = () => {
  return nextPlaceId++;
};

const generateReviewId = () => {
  return nextReviewId++;
};

// Inicializar dados mockados
const initializeMockData = () => {
  // Usuários mockados
  users = [
    {
      id: 1,
      name: 'Manu Fraga',
      email: 'manu.fraga@email.com',
      password: '123456',
      pet: {
        name: 'Dobby',
        type: 'Cachorro',
        breed: 'Shitzu'
      }
    },
    {
      id: 2,
      name: 'Filipe Andion',
      email: 'filipe.andion@email.com',
      password: '123456',
      pet: {
        name: 'Simba',
        type: 'Cachorro',
        breed: 'Shitzu'
      }
    },
    {
      id: 3,
      name: 'Harry Potter',
      email: 'harry.potter@email.com',
      password: '123456',
      pet: {
        name: 'Edwirges',
        type: 'Cachorro',
        breed: 'Poddle'
      }
    },
    {
      id: 4,
      name: 'Hermione Granger',
      email: 'hermione.granger@email.com',
      password: '123456',
      pet: {
        name: 'Mia',
        type: 'Gato',
        breed: 'Persa'
      }
    },
    {
      id: 5,
      name: 'Ron Weasley',
      email: 'ron.weasley@email.com',
      password: '123456',
      pet: {
        name: 'Perebas',
        type: 'Gato',
        breed: 'Persa'
      }
    }
  ];

  // Locais mockados
  places = [
    {
      id: 1,
      name: 'O Beco Diagonal',
      type: 'Pet Shop'
    },
    {
      id: 2,
      name: 'Clínica Veterinária Dedos de Mel',
      type: 'Clínica Veterinária'
    },
    {
      id: 3,
      name: 'Hogwarts',
      type: 'Parque'
    },
    {
      id: 4,
      name: 'Shopping Alfeneiros',
      type: 'Shopping'
    },
    {
      id: 5,
      name: 'Praia Pet Feliz',
      type: 'Praia'
    },
    {
      id: 6,
      name: 'Pet Shop AUmigão',
      type: 'Pet Shop'
    },
    {
      id: 7,
      name: 'Veterinária Minerva',
      type: 'Clínica Veterinária'
    },
    {
      id: 8,
      name: 'Parque Botânico',
      type: 'Parque'
    },
    {
      id: 9,
      name: 'Shopping Azkaban',
      type: 'Shopping'
    },
    {
      id: 10,
      name: 'Praia Sossego',
      type: 'Praia'
    }
  ];

  // Avaliações mockadas
  reviews = [
    {
      id: 1,
      userId: 1,
      placeId: 1,
      rating: 5,
      comment: 'Excelente atendimento! Meu cachorro adorou o banho.',
      createdAt: new Date('2024-01-15')
    },
    {
      id: 2,
      userId: 2,
      placeId: 1,
      rating: 4,
      comment: 'Bom preço e qualidade. Recomendo!',
      createdAt: new Date('2024-01-20')
    },
    {
      id: 3,
      userId: 3,
      placeId: 2,
      rating: 5,
      comment: 'Atendimento de emergência muito eficiente.',
      createdAt: new Date('2024-01-10')
    },
    {
      id: 4,
      userId: 4,
      placeId: 3,
      rating: 4,
      comment: 'Parque lindo e muito bem cuidado para pets.',
      createdAt: new Date('2024-01-25')
    },
    {
      id: 5,
      userId: 5,
      placeId: 4,
      rating: 3,
      comment: 'Shopping bom, mas poderia ter mais áreas para pets.',
      createdAt: new Date('2024-01-18')
    },
    {
      id: 6,
      userId: 1,
      placeId: 5,
      rating: 5,
      comment: 'Praia incrível! Meu cachorro adorou brincar na areia.',
      createdAt: new Date('2024-01-30')
    },
    {
      id: 7,
      userId: 2,
      placeId: 6,
      rating: 4,
      comment: 'Pet shop especializado em raças pequenas. Muito bom!',
      createdAt: new Date('2024-02-01')
    },
    {
      id: 8,
      userId: 3,
      placeId: 7,
      rating: 5,
      comment: 'Salvaram a vida do meu cachorro. Profissionais excelentes!',
      createdAt: new Date('2024-02-05')
    },
    {
      id: 9,
      userId: 4,
      placeId: 8,
      rating: 4,
      comment: 'Parque com área de agility muito bem estruturada.',
      createdAt: new Date('2024-02-10')
    },
    {
      id: 10,
      userId: 5,
      placeId: 9,
      rating: 3,
      comment: 'Shopping bom, mas algumas lojas não permitem pets.',
      createdAt: new Date('2024-02-15')
    }
  ];

  // Favoritos mockados
  favorites = [
    {
      userId: 1,
      placeId: 1
    },
    {
      userId: 1,
      placeId: 3
    },
    {
      userId: 2,
      placeId: 2
    },
    {
      userId: 2,
      placeId: 5
    },
    {
      userId: 3,
      placeId: 7
    },
    {
      userId: 3,
      placeId: 8
    },
    {
      userId: 4,
      placeId: 3
    },
    {
      userId: 4,
      placeId: 6
    },
    {
      userId: 5,
      placeId: 4
    },
    {
      userId: 5,
      placeId: 9
    }
  ];

  console.log('✅ Dados mockados inicializados com sucesso!');
  console.log(`👥 ${users.length} usuários cadastrados`);
  console.log(`🏪 ${places.length} locais cadastrados`);
  console.log(`⭐ ${reviews.length} avaliações cadastradas`);
  console.log(`❤️ ${favorites.length} favoritos cadastrados`);
};

// Funções para manipular dados
const getUsers = () => users;
const getPlaces = () => places;
const getReviews = () => reviews;
const getFavorites = () => favorites;

const addUser = (user) => {
  // Validação da senha (6 dígitos numéricos)
  if (!user.password || !/^[0-9]{6}$/.test(user.password)) {
    throw new Error('A senha deve conter exatamente 6 dígitos numéricos');
  }
  
  const newUser = { ...user, id: generateUserId() };
  users.push(newUser);
  return newUser;
};

const addPlace = (place) => {
  const newPlace = { ...place, id: generatePlaceId() };
  places.push(newPlace);
  return newPlace;
};

const addReview = (review) => {
  const newReview = { 
    ...review, 
    id: generateReviewId(),
    createdAt: new Date()
  };
  reviews.push(newReview);
  return newReview;
};

const addFavorite = (userId, placeId) => {
  const favorite = { userId, placeId };
  favorites.push(favorite);
  return favorite;
};

const removeFavorite = (userId, placeId) => {
  const index = favorites.findIndex(f => f.userId === userId && f.placeId === placeId);
  if (index !== -1) {
    favorites.splice(index, 1);
    return true;
  }
  return false;
};

const findUserById = (id) => users.find(user => user.id === parseInt(id));
const findPlaceById = (id) => places.find(place => place.id === parseInt(id));
const findReviewById = (id) => reviews.find(review => review.id === parseInt(id));

const getUserFavorites = (userId) => {
  const userFavorites = favorites.filter(f => f.userId === parseInt(userId));
  return userFavorites.map(f => {
    const place = findPlaceById(f.placeId);
    return { ...f, place };
  });
};

const getPlaceReviews = (placeId) => {
  return reviews.filter(review => review.placeId === parseInt(placeId));
};

const checkUserReviewExists = (userId, placeId) => {
  return reviews.some(review => review.userId === parseInt(userId) && review.placeId === parseInt(placeId));
};

const checkFavoriteExists = (userId, placeId) => {
  return favorites.some(f => f.userId === parseInt(userId) && f.placeId === parseInt(placeId));
};

// Função para autenticação de usuários
const authenticateUser = (email, password) => {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    // Retorna uma cópia do usuário sem a senha por segurança
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

// Função para encontrar usuário por email
const findUserByEmail = (email) => {
  return users.find(u => u.email === email);
};

module.exports = {
  initializeMockData,
  getUsers,
  getPlaces,
  getReviews,
  getFavorites,
  addUser,
  addPlace,
  addReview,
  addFavorite,
  removeFavorite,
  findUserById,
  findPlaceById,
  findReviewById,
  getUserFavorites,
  getPlaceReviews,
  checkUserReviewExists,
  checkFavoriteExists,
  authenticateUser,
  findUserByEmail
};
