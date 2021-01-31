<?php

namespace App\Controller;

use App\Entity\Record;
use App\Repository\RecordRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class RecordController extends AbstractController
{
    /**
     * Récupère les 5 meilleurs temps
     * 
     * @Route("/records", name="record", methods={"GET"})
     */
    public function index(RecordRepository $recordRepository): Response
    {
        $result = $recordRepository->findBy([], ['time'=> 'ASC'], 5);

        return $this->json($result);
    }
    
    /**
     * Récupère le meilleur temps
     * 
     * @Route("/records/best", name="best_record", methods={"GET"})
     */
    public function best(RecordRepository $recordRepository): Response
    {
        $result = $recordRepository->findOneBy([],['time'=> 'ASC']);

        return $this->json($result);
    }
    
    /**
     * Sauvegarde d'un meilleur temps en base de données
     * 
     * @Route("/records/create", name="create_record", methods={"POST"})
     */
    public function create(Request $request, EntityManagerInterface $em, SerializerInterface $serializer): Response
    {
        // Récupération des données envoyées par le jeu 
        $data = $request->getContent();

        if($data) {
            // Désérialisation des données json en objet PHP
            $record = $serializer->deserialize($data, Record::class, 'json');
            
            // Sauvegarde du meilleur temps en base de données avec doctrine
            $em->persist($record);
            $em->flush();

            // Confirmation que l'enregistrement s'est bien passé
            return $this->json($record, 201);
        }

        // Envoi d'une erreur car les données envoyées sont fausses
        return $this->json('invalid data', 400);
    }
}
