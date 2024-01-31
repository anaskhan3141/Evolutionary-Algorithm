const lowerBoundaryX = 0.5;
const upperBoundaryX = 7.5;
const lowerBoundaryY = -4.0;
const upperBoundaryY = 2.85;

const getFitness = (x, y) => parseFloat((11 * x - 7.59 * y).toFixed(5));

const sortPopulation = population => population.sort((a, b) => b.fitness - a.fitness);

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;



const initializePopulation = populationSize => {

    const population = [];

    for (let i = 0; i < populationSize; i++) {

        const x = parseFloat(getRandomNumber(7.5, 0.5).toFixed(5));
        const y = parseFloat(getRandomNumber(2.85, -4.0).toFixed(5));
        const fitness = getFitness(x, y);
        population.push({ x, y, fitness });

    }

    return sortPopulation(population)

}

const rouletteWheelSelection = population => {

    const totalFitness = population.reduce((sum, individual) => sum + individual.fitness, 0);
    const randomValue = Math.random() * totalFitness;

    let cumulativeFitness = 0;
    for (const individual of population) {

        cumulativeFitness += individual.fitness;
        if (cumulativeFitness >= randomValue) return individual;

    }

    return population[population.length - 1];

}

const selectParentsForCrossover = (population, numParents) => {

    const selectedParents = [];
    for (let i = 0; i < numParents; i++) {

        const selectedParent = rouletteWheelSelection(population);
        selectedParents.push(selectedParent);
        population = population.filter(individual => individual !== selectedParent);

    }

    return selectedParents;

};

const crossover = population => {

    const selectedParents = selectParentsForCrossover(population, population.length / 2);

    const newGen = [];
    for (let i = 0; i < selectedParents.length; i++) {

        for (let j = i + 1; j < selectedParents.length; j++) {

            newGen.push({ x: selectedParents[j].x, y: selectedParents[i].y, fitness: getFitness(selectedParents[j].x, selectedParents[i].y) });
            newGen.push({ x: selectedParents[i].x, y: selectedParents[j].y, fitness: getFitness(selectedParents[i].x, selectedParents[j].y) });

        }

    }

    return sortPopulation(newGen).slice(0, population.length);

};

const mutate = population => {

    for (const individual of population) {
        if (getRandomNumber(0, 100) <= 50) {
            individual.x += Math.round(getRandomNumber(0, 100)) < 50 ? 0.1 : -0.1;
            individual.x = parseFloat(individual.x.toFixed(5));
            individual.x = Math.min(upperBoundaryX, Math.max(lowerBoundaryX, individual.x));
        }
        if (getRandomNumber(0, 100) <= 50) {
            individual.y += Math.round(getRandomNumber(0, 100)) < 50 ? 0.1 : -0.1;
            individual.y = parseFloat(individual.y.toFixed(5));
            individual.y = Math.min(upperBoundaryY, Math.max(lowerBoundaryY, individual.y));
        }
    }
    return population;

};

const evolutionAlgorithm = (populationSize, threshold) => {

    let population = initializePopulation(populationSize);
    const bestFitnesses = [population[0].fitness];

    for (let i = 0; i<50; i++) {
        console.log(i)
        const newGen = crossover(population);
        const mutatedGen = mutate(newGen);
        if (Math.abs(mutatedGen[0].fitness - population[0].fitness) <= threshold) {

            bestFitnesses.push(mutatedGen[0].fitness);
            break;

        }
        
        population = mutatedGen;
        bestFitnesses.push(population[0].fitness);

    }

    return bestFitnesses;
    
};

// const fitnessValues = evolutionAlgorithm(10, 0.01)
// console.log(fitnessValues);