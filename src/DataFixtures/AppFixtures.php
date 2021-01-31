<?php

namespace App\DataFixtures;

use App\Entity\Record;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // Création des 10 meilleurs temps fictifs pour avoir des données à afficher
        for ($i=0; $i < 10; $i++) { 
            $record = new Record();
            $record->setPseudo('anonyme'.$i);
            $record->setTime(1000);
            $manager->persist($record);
        }

        $manager->flush();
    }
}
